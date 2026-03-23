/**
 * FlyEasy — shared logic (localStorage, validation, auth)
 */

const STORAGE_USER = "flyeasyUser";
const STORAGE_BOOKING = "flyeasyBooking";

function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(data) {
  localStorage.setItem(STORAGE_USER, JSON.stringify(data));
}

function clearUser() {
  localStorage.removeItem(STORAGE_USER);
}

function getBooking() {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKING);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setBooking(data) {
  localStorage.setItem(STORAGE_BOOKING, JSON.stringify(data));
}

function clearBooking() {
  localStorage.removeItem(STORAGE_BOOKING);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).trim());
}

function validatePassword(pw) {
  return String(pw).length >= 6;
}

function showError(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
}

function hideError(el) {
  if (!el) return;
  el.classList.remove("show");
  el.textContent = "";
}

function requireLogin(redirectTo = "login.html") {
  if (!getUser()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

function logout() {
  clearUser();
  clearBooking();
  window.location.href = "login.html";
}

function generateTicketId() {
  const part = () => Math.floor(10000 + Math.random() * 90000);
  return `FE-${part()}-${part()}`;
}

// Expose for inline handlers if needed
window.FlyEasy = {
  getUser,
  setUser,
  clearUser,
  getBooking,
  setBooking,
  clearBooking,
  validateEmail,
  validatePassword,
  showError,
  hideError,
  requireLogin,
  logout,
  generateTicketId,
};
