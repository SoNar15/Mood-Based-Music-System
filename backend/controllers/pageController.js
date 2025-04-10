// controllers/pageController.js
export const getAboutInfo = (req, res) => {
  res.json({
    title: 'About MOODYYY',
    creators: ['You 😉', 'Some AI help'],
    desc: 'An emotion-based music recommendation system.',
  });
};

export const getHomeInfo = (req, res) => {
  res.json({
    message: 'Welcome to MOODYYY - Let your feelings pick the playlist 🎶',
  });
};
