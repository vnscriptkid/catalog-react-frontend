import * as categoryActions from './category';
import * as articleActions from './article';
import * as authActions from './auth';
import * as notificationActions from './notification';

export default {
    ...categoryActions,
    ...articleActions,
    ...authActions,
    ...notificationActions
}