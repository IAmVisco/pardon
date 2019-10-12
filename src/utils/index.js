const toggleButton = (button, spinner) => {
  spinner.classList.toggle('d-none')
  button.disabled = !button.disabled
}

const validationMessages = {
  invalidEmailErrorText: 'Please provide a valid email.',
  takenEmailErrorText: 'This email is already taken.',
  invalidUsernameErrorText: 'Please provide a valid username, longer than 4 symbols.',
  takenUsernameErrorText: 'This username is already taken.'
}

const UUID_V4 = 4

export {
  UUID_V4,
  toggleButton,
  validationMessages
}
