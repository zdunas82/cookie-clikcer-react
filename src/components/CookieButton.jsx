function CookieButton({ onClick }) {
  return (
    <img
      src="/images/cookie.png"
      alt="Cookie"
      id="cookie-image"
      onClick={onClick}
    />
  );
}

export default CookieButton;
