import api from '../../services/api';
import { logout } from '../../services/auth';

function getPageRange(currentPage, totalPages, neighborhood) {
  const range = [];
  if (totalPages > 1 && currentPage !== 0) {
    if (currentPage !== 1) {
      range.push(1);
    }
    if (totalPages < neighborhood * 2 + 1) {
      for (let i = Math.min(currentPage, 2); i < totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage - neighborhood < 2) {
        for (let i = 2; i < currentPage; i++) {
          range.push(i);
        }
      } else {
        for (let i = currentPage - neighborhood; i < currentPage; i++) {
          range.push(i);
        }
      }
      range.push(currentPage);
      if (currentPage + neighborhood > totalPages - 1) {
        for (let i = currentPage + 1; i < totalPages; i++) {
          range.push(i);
        }
      } else {
        for (let i = currentPage + 1; i <= currentPage + neighborhood; i++) {
          range.push(i);
        }
      }
    }
    if (totalPages !== range[range.length - 1]) {
      range.push(totalPages);
    }
  }
  range[range.indexOf(currentPage)] = range[range.indexOf(currentPage)] * -1;
  return range;
}

const ListState = {
  error: '',
  errorLevel: '',
  currentPage: 0,
  totalItems: 0,
  totalPages: 0,
  perPage: 0,
  sortField: '',
  items: []
};

async function getPageSetState(apiAction, page, sortField, caller) {
  const newState = {};
  let msgErro = '';
  try {
    const sortParam = sortField ? `&sort=${sortField}` : '';
    const response = await api.get(
      `${apiAction}?page=${page.toString()}${sortParam}`
    );

    const { count, rows, perpage } = response.data;
    const totalPages = Math.ceil(count / perpage);

    newState.currentPage = page;
    newState.sortField = sortField || 'name';
    newState.totalItems = count;
    newState.items = rows;
    newState.perPage = perpage;
    newState.totalPages = totalPages;
  } catch (err) {
    newState.errorLevel = 'danger';
    if (err.response) {
      const { error } = err.response.data;
      if (error === 'Usuario não autorizado') {
        logout();
      }
      msgErro = `response - ${error}`;
    } else {
      msgErro = `Outro - ${err.message}`;
    }
    newState.error = msgErro;
  }
  caller.setState(newState);
}

export { getPageRange, getPageSetState, ListState };
