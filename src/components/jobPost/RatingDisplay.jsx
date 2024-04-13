import React from 'react';

const RatingDisplay = ({ rating,size="md" }) => {
  const totalStars = 10; // Total halves of stars (5 stars, two halves each)
  const ratingValue = Math.round(rating * 2); // Convert the rating to a scale of 1 to 10

  return (
    <div className={`rating rating-${size} rating-half`}>
      {Array.from({ length: totalStars }, (_, index) => (
        <input
          key={index}
          disabled
          type="radio"
          name="rating-10"
          className={`bg-primary mask mask-star-2 mask-half-${index % 2 + 1} cursor-default`}
          checked={index == ratingValue-1}
        />
      ))}
    </div>
  );
};

export default RatingDisplay;
