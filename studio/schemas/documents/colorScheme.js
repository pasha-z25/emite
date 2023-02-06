import React from 'react'
import { AiOutlineBgColors } from 'react-icons/all'

export default {
  name: 'colorPalette',
  type: 'document',
  title: 'Colors',
  icon: AiOutlineBgColors,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.error('The title is required').required(),
    },
    {
      name: 'color',
      title: 'Select color',
      type: 'color',
      validation: (Rule) => Rule.error('Color is required!').required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color.hex',
    },
    prepare({ title, color }) {
      const styles = {
        display: 'block',
        width: '100%',
        maxWidth: '50px',
        paddingTop: '100%',
        borderRadius: '50%',
        backgroundColor: color,
      }
      return {
        media: <span style={styles} />,
        title,
        subtitle: color,
      }
    },
  },
}
