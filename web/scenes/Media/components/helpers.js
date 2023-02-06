import { useEffect, useState } from 'react'
import Image from 'next/image'
import SVG from '~/components/SVG'
import { Loader } from '~/components/Loader'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { useGlobalState } from '~/utils/state'
import { Color, mediaOptions } from '~/utils/constants'
import {
  getImageUrl,
  getUrlFromId,
  getYoutubeVideoId,
  handleMutations,
  toDataURL,
  createNewSanityUser,
} from '~/utils/helpers'
import { playIcon } from '~/utils/svgImages'

export const useImages = () => {
  const [toggle, setToggle] = useState(false)
  const [images, setImages] = useGlobalState('posts', [])

  /*
  const QUERY = groq`
    *[_type == "mission"] [0...${
      images.length ? images.length + mediaOptions.addNumberOfImages : mediaOptions.startImagesLimit
    }] {
      _id,
      media,
    }
  `

  useEffect(async () => {
    const result = await getClient().fetch(QUERY)
    let images = []
    result.forEach((mission) => {
      mission.media?.map((media) => {
        if (media._type === 'mediaCollection') {
          images.push({
            _id: mission._id,
            _key: media._key,
            _type: media._type,
            alt: media.alt,
            caption: media.caption,
            asset: {
              _ref: media.asset._ref,
              _type: media.asset._type,
            },
            preview: {
              asset: {
                _ref: media?.preview?.asset._ref,
                _type: media?.preview?.asset._type,
              },
            },
            likes: media.likes,
          })
        } else if (media._type === 'imageCollection') {
          images.push({
            _id: mission._id,
            _key: media._key,
            _type: media._type,
            alt: media.alt,
            caption: media.caption,
            asset: {
              _ref: media.asset._ref,
              _type: media.asset._type,
            },
            likes: media.likes,
          })
        } else {
          images.push({
            _id: mission._id,
            _key: media._key,
            _type: media._type,
            alt: media.alt,
            caption: media.caption,
            link: media.link,
            likes: media.likes,
            preview: {
              asset: {
                _ref: media?.preview?.asset._ref,
                _type: media?.preview?.asset._type,
              },
            },
          })
        }
      })
    })
    setImages(images)
  }, [toggle])
  */

  // const QUERY = groq`
  //   *[_type in ["mission", "mediaGallery"] && length(media) > 0].media
  // `
  const QUERY = groq`
    *[_type in ["mission", "mediaGallery"] && length(media) > 0] {
      _id,
      _type,
      title,
      media,
    }
  `

  useEffect(async () => {
    // const result = (await getClient().fetch(QUERY)).flat().filter((item) => item.date)
    const result = await getClient().fetch(QUERY)
    const intermediateImages = []
    result.forEach((entity) => {
      entity.media?.map((media) => {
        if (media._type === 'mediaCollection') {
          intermediateImages.push({
            _id: entity._id,
            _key: media._key,
            _type: media._type,
            caption: media.caption,
            likes: media.likes,
            date: media.date,
            asset: {
              _ref: media.asset?._ref,
              _type: media.asset?._type,
            },
            preview: {
              asset: {
                _ref: media?.preview?.asset?._ref,
                _type: media?.preview?.asset?._type,
              },
            },
          })
        } else if (media._type === 'imageCollection') {
          intermediateImages.push({
            _id: entity._id,
            _key: media._key,
            _type: media._type,
            caption: media.caption,
            likes: media.likes,
            date: media.date,
            alt: media.alt ? media.alt : media.caption,
            asset: {
              _ref: media.asset?._ref,
              _type: media.asset?._type,
            },
          })
        } else {
          intermediateImages.push({
            _id: entity._id,
            _key: media._key,
            _type: media._type,
            caption: media.caption,
            likes: media.likes,
            date: media.date,
            link: media.link,
            preview: {
              asset: {
                _ref: media?.preview?.asset?._ref,
                _type: media?.preview?.asset?._type,
              },
            },
          })
        }
      })
    })
    intermediateImages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setImages(
      intermediateImages.slice(
        0,
        images.length
          ? images.length + mediaOptions.addNumberOfImages
          : mediaOptions.startImagesLimit
      )
    )
  }, [toggle])
  return [images, () => setToggle((old) => !old)]
}

export const useCountOfAllImages = () => {
  const [count, setCount] = useState(0)
  const QUERY = groq`
    *[_type in ["mission", "mediaGallery"] && length(media) > 0] {
      _id,
      _type,
      media,
    }
  `
  useEffect(() => {
    getClient()
      .fetch(QUERY)
      .then((list) => {
        let images = []
        list.forEach((entity) => {
          entity.media?.map((media) => {
            images.push({
              _id: entity._id,
              _key: media._key,
              _type: media._type,
            })
          })
        })
        return images.length
      })
      .then(setCount)
  }, [])

  return count
}

export const imageLikesHandler = (e, image, sanityUser, auth0User, isLiked) => {
  const likedMutations = [
    {
      createIfNotExists: createNewSanityUser(auth0User),
    },
    {
      patch: {
        id: image._id,
        setIfMissing: {
          [`media[_key=="${image._key}"].likes`]: 0,
        },
        inc: {
          [`media[_key=="${image._key}"].likes`]: 1,
        },
      },
    },
    {
      patch: {
        id: sanityUser._id,
        setIfMissing: {
          media: [],
        },
        insert: {
          after: 'media[-1]',
          items: [
            {
              caption: image.caption,
              mediaKey: image._key,
              mediaType: image._type,
              _key: image._key,
            },
          ],
        },
      },
    },
  ]
  const dislikedMutations = [
    {
      patch: {
        id: image._id,
        setIfMissing: {
          [`media[_key=="${image._key}"].likes`]: 0,
        },
        dec: {
          [`media[_key=="${image._key}"].likes`]: 1,
        },
      },
    },
    {
      patch: {
        id: sanityUser._id,
        unset: [`media[_key=="${image._key}"]`],
      },
    },
  ]
  handleMutations(isLiked ? dislikedMutations : likedMutations)
  const link = e.target.closest('a')
  link.classList.add('like')
  link.classList.add('like-red')
  setTimeout(() => link.classList.remove('like'), 500)
}

export const imagesDownloadHandler = (url, name) => {
  const link = document.createElement('a')
  link.setAttribute('download', name)
  link.setAttribute('hidden', 'true')
  link.setAttribute('style', 'position: absolute; opacity: 0; z-index: -1;')
  link.setAttribute('target', '_blank')
  link.setAttribute('rel', 'noopener noreferrer')
  toDataURL(url).then((dataUrl) => {
    link.setAttribute('href', dataUrl)
    document.body.appendChild(link)
    link.click()
    setTimeout(() => link.remove())
  })
}

export const mediaItem = (media, full = false) => {
  switch (media._type) {
    case 'imageCollection':
      return (
        <div className="image-wrapper block-square">
          <Image src={`${getImageUrl(media.asset?._ref).width(700).height(700)}`} layout="fill" />
        </div>
      )
    case 'mediaCollection':
      return (
        <div className="video-wrapper my-auto">
          {!full && <SVG content={playIcon(Color.White)} size={24} className={'play-icon'} />}
          {!full && media?.preview?.asset?._ref ? (
            <Image
              src={`${getImageUrl(media.preview?.asset?._ref).width(500).height(500)}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <video width="100%" controls={full}>
              <source src={getUrlFromId(media.asset?._ref)} type="video/mp4" />
              Your browser doesn&apos;t support HTML5 video tag.
            </video>
          )}
        </div>
      )
    case 'youtubeLink':
      return (
        <div className="youtube-wrapper">
          {full ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(media.link)}?enablejsapi=1`}
              title={media.caption}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <SVG content={playIcon(Color.White)} size={24} className={'play-icon'} />
              {!full && media?.preview?.asset?._ref ? (
                <Image
                  src={`${getImageUrl(media.preview?.asset?._ref).width(500).height(500)}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              ) : (
                <Image
                  src={`https://img.youtube.com/vi/${getYoutubeVideoId(media.link)}/0.jpg`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
            </>
          )}
        </div>
      )
    default:
      return (
        <div className="image-wrapper">
          <Loader />
        </div>
      )
  }
}
