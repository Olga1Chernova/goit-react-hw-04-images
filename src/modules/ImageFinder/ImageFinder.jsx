import { useState, useEffect } from "react";


import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "shared/components/Button/Button";
import Loader from "shared/components/Loader/Loader";
import Modal from "shared/components/modal/Modal";
import ImgDetails from "./ImgDetails/ImgDetails";

import { searchImages } from "shared/services/images-api";


import css from "./image-finder.module.scss";

const ImageFinder = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchImages();
  }, [search, page, setError, setItems, setLoading])

  const findImage = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }

  const showImg = ({ largeImageURL, tags }) => {
    setPostDetails({ largeImageURL, tags });
    setShowModal(true); 
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  const closeModal = () => {
    setShowModal(false);
    setPostDetails(null);
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={findImage} />
      <ImageGallery items={items} showImg={showImg} />
      {error && <p className={css.error}>Oops. Something went wrong :( </p>}
      {loading && <Loader />}
      {Boolean(items.length) && (
        <Button text={'Load more'} loadMore={loadMore} />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <ImgDetails {...postDetails} />
        </Modal>
      )}
    </div>
  );

}


export default ImageFinder;
/*
class ImageFinder extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    showModal: false,
    postDetails: null,
  };

  FindImage = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImg = ({ largeImageURL, tags }) => {
    this.setState({
      postDetails: {
        largeImageURL,
        tags
      },
      showModal: true,
    })
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      postDetails: null,
    })
  }

  render() {
    const { items, loading, error, showModal, postDetails } = this.state;
    const { FindImage, loadMore, showImg } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={FindImage} />
        <ImageGallery items={items} showImg={showImg} />
        {error && <p className={css.error}>Oops. Something went wrong :( </p>}
        {loading && <Loader />}
        {Boolean(items.length) && (
          <Button text={'Load more'} loadMore={loadMore} />
        )}
        {showModal &&
          <Modal close={this.closeModal}>
            <ImgDetails {...postDetails} />
          </Modal>}
      </div>
    );
  }
}
*/
