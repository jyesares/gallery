export const getRecentPhotos = page =>
  fetch(`/api/photos/getrecents?per_page=10&page=${page}`);
