
import PropTypes from "prop-types";
import { FcSearch } from 'react-icons/fc';

import css from "./searchbar.module.scss";
import initialState from "./initialState";
import useForm from "../../../shared/hooks/useForm";

const Searchbar = ({onSubmit}) => {
   //use custom form hook
  const { state, handleChange, handleSubmit } = useForm({ initialState, onSubmit });

  /*const [state, setState] = useState({ ...initialState });

   const handleChange = ({ target }) => {
     const { name, value } = target;
     setState(prevState => {
       return { ...prevState, [name]: value };
     });
   };

   const handleSubmit = e => {
     e.preventDefault();
     onSubmit({ ...state });
     setState({ ...initialState });
  }
  */
  
  const { search } = state;

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
          <span>
            <FcSearch className={css.icon} />
          </span>
        </button>

        <input
          className={css['SearchForm-input']}
          name="search"
          value={search}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );

}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

/*
class Searchbar extends Component{

  state = {
    search: "",
  }

  handleChange = ({target}) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  }

  reset() {
    this.setState({search: "",});
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
        return (
          <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
              <button type="submit" className={css['SearchForm-button']}>
                <span className={css['SearchForm-button-label']}>Search</span>
                <span>
                  <FcSearch className={css.icon} />
                </span>
              </button>

              <input
                className={css['SearchForm-input']}
                name="search"
                value={search}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                required
              />
            </form>
          </header>
        );
    }
}

*/

