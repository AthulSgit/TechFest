function Gallery() {
  const images = [
    "/images/open.jpg",
    "/images/robo.jpg",
    "/images/hackathon.jpg"
  ];

  return (
    <div className="page">
      <h1>Gallery</h1>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`TechFest event ${index + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;