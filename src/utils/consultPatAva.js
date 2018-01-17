export default (consult) => {
  if (consult.patAvatar) {
    return consult.patAvatar
  }
  else if (consult.consulterGender) {
    return `./static/img/pat.${consult.consulterGender}.jpg`
  }
  else if (consult.patGender) {
    return `./static/img/pat.${consult.patGender}.jpg`
  }
  else if (consult.replierAvatar) {
    return consult.replierAvatar
  }
  else {
    return `./static/img/pat.m.jpg`
  }
}
