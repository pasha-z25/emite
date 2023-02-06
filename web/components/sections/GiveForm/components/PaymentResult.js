export const Result = () => {
  return (
    <>
      <div className="text-center">
        <h2 className="h2 weight-800 mb-2rem color-darkgray">Thank you for giving!</h2>
        <p>
          We have sent a payment report to your email. Start experiencing charity now.{' '}
          <a href="/signup" className="color-red bold">
            Create your account
          </a>{' '}
          to see the impact you&apos;re making worldwide.
        </p>
      </div>
    </>
  )
}
