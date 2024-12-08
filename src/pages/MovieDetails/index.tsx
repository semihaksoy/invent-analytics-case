import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Descriptions, Image, Typography, Spin, Row, Col } from "antd";

import axiosInstance from "../../api/axiosInstance";
import type { MovieDetails, Rating } from "../../types/api/movieDetails.types";

import { FALLBACK_IMAGE_URL } from "../../utils/constants";

import styles from "./MovieDetails.module.scss";

const { Title } = Typography;

const detailFields: { label: string; key: keyof MovieDetails }[] = [
  { label: "Title", key: "Title" },
  { label: "Year", key: "Year" },
  { label: "Rated", key: "Rated" },
  { label: "Released", key: "Released" },
  { label: "Duration", key: "Runtime" },
  { label: "Genre", key: "Genre" },
  { label: "Director", key: "Director" },
  { label: "Writer", key: "Writer" },
  { label: "Actors", key: "Actors" },
  { label: "Plot", key: "Plot" },
  { label: "Language", key: "Language" },
  { label: "Country", key: "Country" },
  { label: "Awards", key: "Awards" },
  { label: "Metascore", key: "Metascore" },
  { label: "IMDb Rating", key: "imdbRating" },
  { label: "IMDb Votes", key: "imdbVotes" },
  { label: "Type", key: "Type" },
  { label: "Total Seasons", key: "totalSeasons" },
];

const MovieDetailsComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async (id:string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<MovieDetails>("/", { 
        params: { i: id } 
    });
      setMovieDetails(response.data);
    } catch (error) {
        console.error("Error fetching movie details:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  const renderRatings = (ratings: Rating[] | undefined) => {
    if (!ratings || ratings.length === 0) return "N/A";
    return ratings.map((rating, index) => (
      <div key={index} className="mb-8">
        <strong>{rating.Source}:</strong> {rating.Value}
      </div>
    ));
  };

  return (
    <Spin spinning={loading}>
        {
            (!loading && movieDetails) && (
                <Row justify="center" gutter={[16, 16]} className={`${styles.movieDetailsContainer} p-16`}>
                    <Col span={24}>
                        <Title level={2} className="ta-center mb-16">
                            {movieDetails.Title || "Movie Details"}
                        </Title>
                    </Col>
                    {movieDetails.Poster && (
                        <Col span={24} className="ta-center">
                        <Image
                            src={movieDetails.Poster}
                            alt={`${movieDetails.Title} Poster`}
                            className={styles.moviePoster}
                            fallback={FALLBACK_IMAGE_URL}
                        />
                        </Col>
                    )}
                    <Col span={24}>
                        <Descriptions bordered column={1} className="mt-24">
                        {detailFields.map(({ label, key }) => (
                            <Descriptions.Item key={key} label={label}>
                            {key === "Ratings"
                                ? renderRatings(movieDetails[key] as Rating[])
                                : movieDetails[key] || "N/A"}
                            </Descriptions.Item>
                        ))}
                        </Descriptions>
                    </Col>
                </Row>
            )    
        }
    </Spin>
  );
};

export default MovieDetailsComponent;
