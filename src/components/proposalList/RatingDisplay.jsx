import React from 'react';
import { Rating, StickerStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'; 

const RatingDisplay = ({ rating, size=100 }) => {
  // Custom styles for the rating component
  const customStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#FF5400', 
    inactiveFillColor: 'rgba(255, 84, 0, 0.2)' // same as activeFillColor but with 20% opacity
  };

  return (
    <div style={{ maxWidth: `${size}px` }}>
      <Rating
        value={rating}
        readOnly
        itemStyles={customStyles}
        // highlightOnlySelected={true}
      />
    </div>
  );
};

export default RatingDisplay;







// import React from 'react';

// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';





// const RatingDisplay = ({ rating,size="medium" }) => {

//   return (
//     <Rating
//       size={size}
//     name="text-feedback"
//     value={rating}
//     readOnly
//     precision={0.5}
//     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//   />
//   );
// };

// export default RatingDisplay;

//----------------------------------------------------------------

// import React from 'react';

// const RatingDisplay = ({ rating,size="md" }) => {
//   const totalStars = 10; // Total halves of stars (5 stars, two halves each)
//   const ratingValue = Math.round(rating * 2); // Convert the rating to a scale of 1 to 10

//   return (
//     <div className={`rating rating-${size} rating-half`}>
//       {Array.from({ length: totalStars }, (_, index) => (
//         <input
//           key={index}
//           disabled
//           type="radio"
//           name="rating-10"
//           className={`bg-primary mask mask-star-2 mask-half-${index % 2 + 1} cursor-default`}
//           checked={index == ratingValue-1}
//         />
//       ))}
//     </div>
//   );
// };

// export default RatingDisplay;
