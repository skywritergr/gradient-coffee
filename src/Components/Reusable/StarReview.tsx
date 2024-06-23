import { Box, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface Props {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarReview = ({ rating, onRatingChange }: Props) => {
  const handleRating = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    onRatingChange(index + 1);
  };

  return (
    <Box>
      {[0, 1, 2, 3, 4].map((index) => (
        <IconButton
          key={index}
          onClick={(event) => handleRating(event, index)}
        >
          {index < rating ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </Box>
  );
};

export default StarReview;
