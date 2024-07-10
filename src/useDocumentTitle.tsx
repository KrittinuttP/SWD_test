import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from './i18n';

const useDocumentTitle = (key: string) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let titleKey = key;

    // Adjust title key based on route if needed
    switch (path) {
      case '/Layout':
        titleKey = 'title_layout';
        break;
      case '/Form':
        titleKey = 'title_form';
        break;
      // Add more cases for other routes as needed
      default:
        titleKey = 'title_home';
    }

    document.title = i18n.t(titleKey);
  }, [location, key]);
};

export default useDocumentTitle;
