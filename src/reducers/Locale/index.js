import { LOCALE_SET } from "../../actions/Locale/localeActionTypes";

export default function locale(state = { lang: "vi" }, action = {}) {
    switch (action.type) {
        case LOCALE_SET:
            return { lang: action.lang };
        default:
            return state;
    }
}