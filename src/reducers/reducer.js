export const initialState = {
  nameInput: "",
  usernameInput: "",
  emailInput: "",
  bioInput: "",
  locationInput: "",
  passwordInput: "",
  imageURL: "",
  radioBtn: "",
  captionInput: "",
  descriptionInput: "",
  posts: [],
  post: {},
  likes: [],
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FULL_NAME":
      return {
        ...state,
        nameInput: action.value,
      };
    case "CHANGE_USER_NAME":
      return {
        ...state,
        usernameInput: action.value,
      };
    case "CHANGE_USER_INPUT": // Type
      return {
        ...state,
        emailInput: action.value, // Value
      };
    case "CHANGE_USER_BIO":
      return {
        ...state,
        bioInput: action.value,
      };
    case "CHANGE_USER_LOCATION":
      return {
        ...state,
        locationInput: action.value,
      };
    case "CHANGE_USER_PASSWORD":
      return {
        ...state,
        passwordInput: action.value,
      };
    case "POST_IMAGE":
      return {
        ...state,
        imageURL: action.value,
      };
    case "RESTAURANT_OR_RECIPE":
      return {
        ...state,
        radioBtn: action.value,
      };
    case "SET_CAPTION":
      return {
        ...state,
        captionInput: action.value,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        descriptionInput: action.value,
      };
    case "SET_POST":
      return {
        ...state,
        posts: [...state.posts, action.value],
      };
    case "ALL_POSTS":
      return {
        ...state,
        posts: action.value,
      };
    case "VIEW_POST":
      return {
        ...state,
        post: action.value,
      };
    case "SET_LIKES":
      return {
        ...state,
        likes: action.likes,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
