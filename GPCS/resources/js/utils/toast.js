import { t } from 'i18next';
import { toast } from 'react-toastify';

/**
 * @typedef ToastifyFunction
 * @type {(content: import('react-toastify').ToastContent, options?: import('react-toastify').ToastOptions) => import('react').ReactText}
 */

/**
 * @type {{
 * success: ToastifyFunction,
 * error: ToastifyFunction,
 * warning: ToastifyFunction,
 * }}
 */
export const toastify = {
  success: (content, options) =>
    toast.success(content, { autoClose: 1000, toastId: content, ...options }),

  warning: (content, options) =>
    toast.warning(content, { autoClose: 5000, toastId: content, ...options }),

  error: (content, options) =>
    toast.error(content, { autoClose: 5000, toastId: content, ...options }),
};

export const toastActionSuccess = () => {
  toastify.success(t('common.success'));
};

export const toastCreateSuccess = () => {
  toastify.success(t('common.successCreation'));
};

export const toastCommonError = (error) => {
  toastify.error(t('common.errorOccurred'));
  if (error) {
    console.error(error);
  }
};
