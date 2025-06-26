import {
  createAppearance,
  getAppearanceByUsername,
  updateAppearance,
} from "@/utils/apiAppearance";
import {
  changePassword,
  createAccount,
  getStartedWithGoogle,
  resetPassword,
  signIn,
  signOut,
} from "@/utils/apiAuth";
import { deleteFile, uploadFile } from "@/utils/apiBucket";
import {
  createLink,
  deleteLink,
  getLinksByUsername,
  updateLink,
  upsertLink,
} from "@/utils/apiLinks";
import {
  createSocialChannel,
  deleteSocialChannel,
  getSocialChannelsByUsername,
  updateSocialChannel,
  upsertSocialChannel,
} from "@/utils/apiSocials";
import {
  createUserProfile,
  getUserProfileByUsername,
  isUsernameTaken,
  updateUserProfile,
} from "@/utils/apiUserProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { createClick, deleteClicksByLinkId } from "@/utils/apiClicks";

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data) => createAccount(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data) => signIn(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOut(),
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetStartedWithGoogle = () => {
  return useMutation({
    mutationFn: (data) => getStartedWithGoogle(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => resetPassword(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useIsUsernameTaken = () => {
  return useMutation({
    mutationFn: (username) => isUsernameTaken(username),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateUserProfile = () => {
  return useMutation({
    mutationFn: (data) => createUserProfile(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (data) => updateUserProfile(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (new_password) => changePassword(new_password),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateSocialChannel = () => {
  return useMutation({
    mutationFn: (data) => createSocialChannel(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateSocialChannel = () => {
  return useMutation({
    mutationFn: (data) => updateSocialChannel(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpsertSocialChannel = () => {
  return useMutation({
    mutationFn: (data) => upsertSocialChannel(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteSocialChannel = () => {
  return useMutation({
    mutationFn: (social_channel_id) => deleteSocialChannel(social_channel_id),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data) => uploadFile(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (path) => deleteFile(path),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateAppearance = () => {
  return useMutation({
    mutationFn: (data) => createAppearance(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateAppearance = () => {
  return useMutation({
    mutationFn: (data) => updateAppearance(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateLink = () => {
  return useMutation({
    mutationFn: (data) => createLink(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateLink = () => {
  return useMutation({
    mutationFn: (data) => updateLink(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpsertLink = () => {
  return useMutation({
    mutationFn: (data) => upsertLink(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteLink = () => {
  return useMutation({
    mutationFn: (data) => deleteLink(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetUserProfileByUsername = (username) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE_BY_USERNAME, username],
    queryFn: () => getUserProfileByUsername(username),
    enabled: !!username,
  });
};

export const useGetAppearanceByUsername = (username) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_APPEARANCE_BY_USERNAME, username],
    queryFn: () => getAppearanceByUsername(username),
    enabled: !!username,
  });
};

export const useGetSocialChannelsByUsername = (username) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SOCIAL_CHANNELS_BY_USERNAME, username],
    queryFn: () => getSocialChannelsByUsername(username),
    enabled: !!username,
  });
};

export const useGetLinksByUsername = (username) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LINKS_BY_USERNAME, username],
    queryFn: () => getLinksByUsername(username),
    enabled: !!username,
  });
};

export const useCreateClick = () => {
  return useMutation({
    mutationFn: (data) => createClick(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteClicksByLinkId = () => {
  return useMutation({
    mutationFn: (link_id) => deleteClicksByLinkId(link_id),
    onError: (error) => {
      throw error;
    },
  });
};
