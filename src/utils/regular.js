export function checkPhone() {
  return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
}

export function checkEmail() {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
}

