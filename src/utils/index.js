const UUID_V4 = 4

const toggleButton = (button, spinner) => {
  spinner.classList.toggle('d-none')
  button.disabled = !button.disabled
}

export {
  UUID_V4,
  toggleButton
}
