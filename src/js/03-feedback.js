import throttle from 'lodash.throttle';

const contFormEl = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const THE_KEY = 'feedback-form-state';
const userInfo = {};

const fillContactFormFields = () => {
  try {
    const userInfoFromLS = JSON.parse(localStorage.getItem('THE_KEY'));

    if (userInfoFromLS === null) {
      return;
    }

      contFormEl.email.value = userInfoFromLS[email];
      contFormEl.message.value = userInfoFromLS[message];
    
  } catch (err) {
    console.log(err);
  }
};

fillContactFormFields();

const onContactFormItemChange = event => {
  const { target } = event;

  const name = target.name;
  const value = target.value;

  userInfo[name] = value;

  localStorage.setItem('THE_KEY', JSON.stringify(userInfo));
};

const onContactFormSubmit = event => {
  event.preventDefault();

  contFormEl.reset();
    localStorage.removeItem('THE_KEY');
    console.log(userInfo);
};

contFormEl.addEventListener('input', throttle(onContactFormItemChange, 500));
contFormEl.addEventListener('submit', onContactFormSubmit);

