import { WINDOW_PROPS, PROFILES } from '../constants'

export function actionWindowProps(windowProps) {
    return {
        type: WINDOW_PROPS,
        windowProps: windowProps,
    }
}

export function actionProfiles(profile, profiles) {

    //Change or add new profile data
    let isProfile, i = 0;

    if (profiles && profiles.length && profile.url) {
        for (i; i < profiles.length; i++) {
            if (profiles[i]['url'] === profile.url) break;
        }
        isProfile = profiles[i];
    }

    if (isProfile) {
        profiles[i] = profile;
    } else if (Array.isArray(profiles)) {
        profiles.push(profile);
    } else {
        profiles = [profile]
    }

    return {
        type: PROFILES,
        profiles,
    }
}