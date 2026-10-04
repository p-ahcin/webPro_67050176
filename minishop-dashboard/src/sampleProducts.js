import backpackImage from './assets/backpack.jpg'
import headphoneImage from './assets/headphone.jpeg'
import laptopImage from './assets/macbook_air.jpg'
import smartWatchImage from './assets/smart_watch.png'

// Local catalog keeps the classroom demo usable when Fake Store API is unavailable.
const sampleProducts = [
  {
    id: 'sample-laptop',
    title: 'Laptop',
    price: 12900,
    image: laptopImage,
    category: 'Computer',
    description: 'A lightweight laptop for study and everyday work.',
    rating: { rate: 4.3, count: 24 },
  },
  {
    id: 'sample-headphones',
    title: 'Headphones',
    price: 1290,
    image: headphoneImage,
    category: 'Audio',
    description: 'Comfortable headphones for music and calls.',
    rating: { rate: 4.3, count: 18 },
  },
  {
    id: 'sample-backpack',
    title: 'Backpack',
    price: 890,
    image: backpackImage,
    category: 'Fashion',
    description: 'A practical backpack for school or travel.',
    rating: { rate: 4.7, count: 32 },
  },
  {
    id: 'sample-watch',
    title: 'Smart Watch',
    price: 2990,
    image: smartWatchImage,
    category: 'Gadget',
    description: 'A smart watch for daily activity and notifications.',
    rating: { rate: 4.4, count: 20 },
  },
]

export default sampleProducts
