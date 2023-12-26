import { message, notification } from "antd";

const DEFAULT_MESSAGE_CONFIG = {
    duration: 1,
};

const showMessage = () => {
    const showSuccess = (mess, config = DEFAULT_MESSAGE_CONFIG) => {
        return notification.success({ message: mess, ...config });
    }

    const showError = (mess, config = DEFAULT_MESSAGE_CONFIG) => {
        return notification.error({ message: mess, ...config });
    }

    const showWarn = (mess, config = DEFAULT_MESSAGE_CONFIG) => {
        return notification.warn({ message: mess });
    }

    const showLoading = (config = DEFAULT_MESSAGE_CONFIG) => {
        return message.loading('Loading...', 10000);
    }
    const destroyMessage = (messageId) => {
        message.destroy(messageId);
    }

    const showActionSuccess = () => {
        return notification.success({ message: 'Thành công!' });
    }

    const showNoData = () => {
        return notification.error({ message: 'Không có dữ liệu!' })
    }

    const showActionFail = () => {
        return notification.error({ message: 'Thất bại!' });
    }

    const showErrorCheckAllField = (config = DEFAULT_MESSAGE_CONFIG) => {
        return showError('Vui lòng kiểm tra lại tất cả thông tin!', config)
    }
    return { showError, showSuccess, showLoading, showWarn, showErrorCheckAllField, destroyMessage, showActionFail, showActionSuccess, showNoData }
}

export default showMessage