import React, { useEffect, useState } from "react"
import "../styles/movieDetails.css"
import Header from "../Components/Header"
import { getMovieById, getCast, getPersonDetails } from "../services/movieService"
import { BASE_URL } from "../config"
import { useParams, Link } from "react-router-dom"

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="gold-star-svg-large">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-user-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const IMDBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.35 12.3h-1.1v-6.6h1.1v6.6zm3.3-3.6h-1.25V15.3H10.6v-6.6h2.2c.6 0 1.05.45 1.05 1.05v2.2c0 .6-.45 1.05-1.05 1.05zm3.85 3.6h-2.2v-6.6h1.1v2.75h1.1c.3 0 .55.25.55.55v2.75c0 .3-.25.55-.55.55zm-3.85-4.4h.6v1.7h-.6v-1.7zm3.85 2.7h-.6v-1h.6v1z" />
  </svg>
)

const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return remainingMinutes > 0 ? `${hours} h ${remainingMinutes} m` : `${hours} h`;
  }
  return `${remainingMinutes} m`;
};

const MovieDetailPage = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [crew, setCrew] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [personDetails, setPersonDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const handlePersonClick = async (person) => {
    setSelectedPerson(person)
    setPersonDetails(null)
    setDetailsLoading(true)
    try {
      const details = await getPersonDetails(person.id)
      setPersonDetails(details)
    } catch (err) {
      console.error("Error fetching person details:", err)
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setSelectedPerson(null)
    setPersonDetails(null)
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true)
      try {
        const movieData = await getMovieById(id)
        setMovie(movieData)

        if (movieData.id) {
          const castData = await getCast(movieData.id)
          setCast(castData.cast || [])
          setCrew(castData.crew || [])
        }
      } catch (err) {
        console.error("Error loading movie details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  const directors = crew.filter((member) => member.job === "Director")
  const writers = crew.filter((member) => member.job === "Writer" || member.job === "Screenplay" || member.job === "Story")
  const producers = crew.filter((member) => member.job === "Producer" || member.job === "Executive Producer")

  if (loading) {
    return (
      <>
        <Header />
        <div className="detail-loading-container">
          <div className="spinner"></div>
          <p>Loading cinematic details...</p>
        </div>
      </>
    )
  }

  if (!movie) {
    return (
      <>
        <Header />
        <div className="detail-loading-container">
          <h2>Oops! Movie details could not be loaded.</h2>
          <Link to="/" className="back-home-btn">Go back to home</Link>
        </div>
      </>
    )
  }

  const renderKeyCrew = () => {
    const keyCrewItems = []
    if (directors.length > 0) {
      keyCrewItems.push({
        role: "Director",
        names: directors.slice(0, 2).map((d) => d.name).join(", ")
      })
    }
    if (writers.length > 0) {
      keyCrewItems.push({
        role: "Writing",
        names: writers.slice(0, 2).map((w) => w.name).join(", ")
      })
    }
    if (producers.length > 0) {
      keyCrewItems.push({
        role: "Producer",
        names: producers.slice(0, 2).map((p) => p.name).join(", ")
      })
    }

    if (keyCrewItems.length === 0) return null

    return (
      <div className="hero-key-crew-grid">
        {keyCrewItems.map((member, idx) => (
          <div key={idx} className="key-crew-item">
            <span className="key-crew-name">{member.names}</span>
            <span className="key-crew-role">{member.role}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderMovieDetails = () => {
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
    const hasPoster = movie.poster_path && movie.poster_path.trim() !== "null"
    const hasBackdrop = movie.backdrop_path && movie.backdrop_path.trim() !== "null"
    const votesCount = movie.vote_count ? `${movie.vote_count} reviews` : "0 reviews"
    const isReleased = movie.status && movie.status.toLowerCase() === "released"

    return (
      <div className="movie-hero-section">
        {hasBackdrop && (
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${BASE_URL}${movie.backdrop_path})` }}
          />
        )}
        <div className="hero-backdrop-overlay" />

        <div className="hero-container">
          <div className="hero-poster-wrapper">
            {hasPoster ? (
              <img
                src={`${BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="hero-poster-image"
              />
            ) : (
              <div className="hero-poster-fallback">
                <span>No Poster Available</span>
              </div>
            )}
          </div>

          <div className="hero-info-wrapper">
            <h1 className="hero-title">{movie.title}</h1>
            {movie.tagline && <p className="hero-tagline">"{movie.tagline}"</p>}

            <div className="hero-meta-row">
              <div className="hero-rating-badge" title={votesCount}>
                <StarIcon />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"} ({votesCount})</span>
              </div>

              <div className="hero-meta-pill">
                <ClockIcon />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>

              <div className="hero-meta-pill">
                <CalendarIcon />
                <span>{releaseYear}</span>
              </div>

              <span className={`hero-status-badge ${isReleased ? "status-released" : "status-upcoming"}`}>
                {movie.status || "Unknown"}
              </span>
            </div>

            <div className="genres-list">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="hero-overview">
              <h3>Overview</h3>
              <p>{movie.overview || "No overview available for this movie."}</p>
            </div>

            {renderKeyCrew()}

            <div className="detail-links-row">
              {movie.homepage && (
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="visit-website-btn">
                  Visit Website
                </a>
              )}
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-imdb-btn"
                >
                  <IMDBIcon />
                  IMDb Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMovieFacts = () => {
    const formatCurrency = (amount) => {
      if (!amount || amount === 0) return "Not Disclosed"
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(amount)
    }

    const originalTitle = movie.original_title && movie.original_title !== movie.title ? movie.original_title : null
    const spokenLanguages = movie.spoken_languages?.map((l) => l.english_name).join(", ") || "N/A"
    const productionCountries = movie.production_countries?.map((c) => c.name).join(", ") || "N/A"

    return (
      <div className="movie-facts-section">
        <div className="facts-grid">
          {/* Fact items panel */}
          <div className="facts-panel">
            <h3>Movie Facts</h3>
            <div className="facts-list">
              {originalTitle && (
                <div className="fact-item">
                  <span className="fact-label">Original Title</span>
                  <span className="fact-value">{originalTitle}</span>
                </div>
              )}
              <div className="fact-item">
                <span className="fact-label">Languages</span>
                <span className="fact-value">{spokenLanguages}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Budget</span>
                <span className="fact-value">{formatCurrency(movie.budget)}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Revenue</span>
                <span className="fact-value">{formatCurrency(movie.revenue)}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Release Countries</span>
                <span className="fact-value">{productionCountries}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Popularity Index</span>
                <span className="fact-value">{movie.popularity ? movie.popularity.toFixed(1) : "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Companies panel */}
          <div className="companies-panel">
            <h3>Production Companies</h3>
            <div className="companies-logo-grid">
              {movie.production_companies && movie.production_companies.length > 0 ? (
                movie.production_companies.slice(0, 4).map((company, idx) => (
                  <div key={company.id || idx} className="company-logo-card">
                    {company.logo_path ? (
                      <img
                        src={`${BASE_URL}${company.logo_path}`}
                        alt={company.name}
                        className="company-logo-image"
                        title={company.name}
                      />
                    ) : (
                      <span className="company-name-text">{company.name}</span>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: "auto 0" }}>No production companies recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCast = cast?.slice(0, 50).map((member, index) => {
    const hasProfile = member.profile_path && member.profile_path.trim() !== "null"
    return (
      <div
        key={member.id || index}
        className="cast-cards"
        onClick={() => handlePersonClick(member)}
        style={{ cursor: "pointer" }}
      >
        <div className="cast-image-wrapper">
          {hasProfile ? (
            <img
              src={`${BASE_URL}${member.profile_path}`}
              alt={member.name}
              loading="lazy"
            />
          ) : (
            <div className="cast-profile-fallback">
              <UserIcon />
            </div>
          )}
        </div>
        <div className="cast-information">
          <h4 className="cast-actor-name">{member.name}</h4>
          <p className="cast-char-name">{member.character || "N/A"}</p>
        </div>
      </div>
    )
  })

  const renderCrew = crew?.slice(0, 50).map((member, index) => {
    const hasProfile = member.profile_path && member.profile_path.trim() !== "null"
    return (
      <div
        key={member.credit_id || member.id || index}
        className="cast-cards crew-cards"
        onClick={() => handlePersonClick(member)}
        style={{ cursor: "pointer" }}
      >
        <div className="cast-image-wrapper crew-image-wrapper">
          {hasProfile ? (
            <img
              src={`${BASE_URL}${member.profile_path}`}
              alt={member.name}
              loading="lazy"
            />
          ) : (
            <div className="cast-profile-fallback crew-profile-fallback">
              <UserIcon />
            </div>
          )}
        </div>
        <div className="cast-information">
          <h4 className="cast-actor-name crew-member-name">{member.name}</h4>
          <p className="cast-char-name crew-job-title">{member.job || "Production Crew"}</p>
        </div>
      </div>
    )
  })

  const renderPersonModal = () => {
    if (!selectedPerson) return null;

    const hasProfile = selectedPerson.profile_path && selectedPerson.profile_path.trim() !== "null";
    const role = selectedPerson.character ? `as ${selectedPerson.character}` : selectedPerson.job || "Crew Member";

    return (
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
          
          <div className="modal-body">
            <div className="modal-left-col">
              {hasProfile ? (
                <img
                  src={`${BASE_URL}${selectedPerson.profile_path}`}
                  alt={selectedPerson.name}
                  className="modal-profile-img"
                />
              ) : (
                <div className="modal-profile-fallback">
                  <UserIcon />
                </div>
              )}
            </div>
            
            <div className="modal-right-col">
              <h2 className="modal-person-name">{selectedPerson.name}</h2>
              <p className="modal-person-role">{role}</p>
              
              <div className="modal-details-scroll">
                {detailsLoading ? (
                  <div className="modal-spinner-container">
                    <div className="spinner"></div>
                    <p>Fetching biography...</p>
                  </div>
                ) : (
                  <>
                    {personDetails ? (
                      <div className="modal-additional-details">
                        {personDetails.biography ? (
                          <div className="modal-bio-section">
                            <h3>Biography</h3>
                            <p className="modal-biography">{personDetails.biography}</p>
                          </div>
                        ) : (
                          <div className="modal-bio-section">
                            <h3>Biography</h3>
                            <p className="modal-biography-empty">No biography available for this person.</p>
                          </div>
                        )}
                        
                        <div className="modal-meta-grid">
                          {personDetails.birthday && (
                            <div className="modal-meta-item">
                              <span className="modal-meta-label">Born</span>
                              <span className="modal-meta-value">
                                {new Date(personDetails.birthday).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </div>
                          )}
                          {personDetails.deathday && (
                            <div className="modal-meta-item">
                              <span className="modal-meta-label">Died</span>
                              <span className="modal-meta-value">
                                {new Date(personDetails.deathday).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </div>
                          )}
                          {personDetails.place_of_birth && (
                            <div className="modal-meta-item">
                              <span className="modal-meta-label">Birth Place</span>
                              <span className="modal-meta-value">{personDetails.place_of_birth}</span>
                            </div>
                          )}
                          {personDetails.known_for_department && (
                            <div className="modal-meta-item">
                              <span className="modal-meta-label">Known For</span>
                              <span className="modal-meta-value">{personDetails.known_for_department}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="modal-error-details">
                        <p>Unable to load detailed biography. Here is the basic card info:</p>
                        <div className="modal-meta-grid">
                          <div className="modal-meta-item">
                            <span className="modal-meta-label">Role</span>
                            <span className="modal-meta-value">{role}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="maind">
        {renderMovieDetails()}
        {renderMovieFacts()}

        <div className="cast-section-container">
          <h2 className="cast-section-title">Top Billed Cast</h2>
          {renderCast && renderCast.length > 0 ? (
            <div className="cast-scroll-wrapper">
              <div className="cast-container">{renderCast}</div>
            </div>
          ) : (
            <p className="no-cast-message">Cast information is not available.</p>
          )}
        </div>

        <div className="cast-section-container crew-section-container">
          <h2 className="cast-section-title">Technical Crew</h2>
          {renderCrew && renderCrew.length > 0 ? (
            <div className="cast-scroll-wrapper">
              <div className="cast-container">{renderCrew}</div>
            </div>
          ) : (
            <p className="no-cast-message">Crew information is not available.</p>
          )}
        </div>
      </div>
      {renderPersonModal()}
    </>
  )
}

export default MovieDetailPage
