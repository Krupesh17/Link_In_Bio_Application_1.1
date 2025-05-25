import * as Yup from "yup";

export const SignInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters long.")
    .required("Password is required"),
});

export const CheckUsernameValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Username can only include letters, numbers, '.', and '_'. No spaces or other special characters."
    )
    .min(4, "Please provide a username of at least 4 characters.")
    .max(30, "Username cannot exceed 30 characters.")
    .required("Username is required"),
});

export const SignUpValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please provide a Name that is at least 2 character long.")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(/.*[A-Z].*/, "Require at least one uppercase character.")
    .matches(/.*[a-z].*/, "Require at least one lowercase character.")
    .matches(/.*\d.*/, "Require at least one numeric character.")
    .matches(
      /.*[`~<>?,./!@#$%^&*()\-_+="|'{}[\];:\\].*/,
      "Require at least one special character."
    )
    .min(8, "The password must be at least 8 characters long.")
    .required("Password is required"),
});

export const ResetPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ChangePasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .matches(/.*[A-Z].*/, "Require at least one uppercase character.")
    .matches(/.*[a-z].*/, "Require at least one lowercase character.")
    .matches(/.*\d.*/, "Require at least one numeric character.")
    .matches(
      /.*[`~<>?,./!@#$%^&*()\-_+="|'{}[\];:\\].*/,
      "Require at least one special character."
    )
    .min(8, "The password must be at least 8 characters long.")
    .required("Password is required"),
});

export const SocialIconPositionValidation = Yup.object().shape({
  socialIconPlacement: Yup.string()
    .oneOf(
      ["top", "bottom"],
      "Please choose where to display your social icons."
    )
    .required("Placement is required."),
});

export const instagramThreadsUsernameValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^@([a-z0-9._]){1,30}$/,
      "Username must start with '@' and can contain lowercase letters, numbers, underscores, and periods (max 30 characters)"
    )
    .required("Username is required."),
});

export const twitterXUsernameValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^@([A-Za-z0-9_]){1,15}$/,
      "Username must start with '@' and can contain letters, numbers, and underscores (max 15 characters)"
    )
    .required("Username is required."),
});

export const facebookURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+$/,
      "Enter a valid Facebook page URL (e.g., https://facebook.com/yourpage)"
    )
    .required("Facebook page URL is required."),
});

export const youtubeURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]+$/,
      "Enter a valid YouTube channel URL"
    )
    .required("YouTube Channel URL is required."),
});

export const whatsappChannelURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/www\.whatsapp\.com\/channel\/[a-zA-Z0-9_-]+$/,
      "Enter a valid WhatsApp channel URL (e.g., https://www.whatsapp.com/channel/yourchannel)"
    )
    .required("Whatsapp Channel URL is required."),
});

export const snapchatURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/www\.snapchat\.com\/add\/[a-zA-Z0-9._-]+$/,
      "Enter a valid Snapchat URL (e.g., https://www.snapchat.com/add/yourusername)"
    )
    .required("Snapchat URL is required."),
});

export const amazonShopURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?amazon\.com\/shop\/[a-zA-Z0-9._-]+$/,
      "Enter a valid Amazon shop URL"
    )
    .required("Amazon shop URL is required."),
});

export const linkedInURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
      "Enter a valid LinkedIn profile URL"
    )
    .required("LinkedIn URL is required."),
});

export const gitHubURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
      "Enter a valid GitHub profile URL"
    )
    .required("GitHub URL is required"),
});

export const telegramURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
      "Enter a valid Telegram link (e.g., https://t.me/yourchannel)"
    )
    .required("Telegram link is required"),
});

export const soundCloudURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/(www\.)?soundcloud\.com\/[a-zA-Z0-9_-]+$/,
      "Enter a valid SoundCloud URL"
    )
    .required("SoundCloud URL is required"),
});

export const spotifyURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/open\.spotify\.com\/artist\/[a-zA-Z0-9]+$/,
      "Enter a valid Spotify artist URL"
    )
    .required("Spotify artist URL is required"),
});

export const appleMusicURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^https:\/\/music\.apple\.com\/[a-zA-Z0-9\-_/]+$/,
      "Enter a valid Apple Music album URL"
    )
    .required("Apple Music URL is required"),
});

export const emailAddressValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

export const phoneNumberValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .matches(
      /^\+\d{6,15}$/,
      "Enter a valid phone number with country code (e.g., +919876543210)"
    )
    .required("Phone number is required."),
});

export const personalWebsiteURLValidation = Yup.object().shape({
  socialAddress: Yup.string()
    .trim()
    .url("Enter a valid website URL (e.g., https://yourwebsite.com)")
    .required("Website URL is required"),
});

export const profileInfoValidation = Yup.object().shape({
  profile_title: Yup.string()
    .max(30, "Profile title cannot be longer than 30 characters")
    .required("Profile title is required"),
  bio: Yup.string().max(80, "Bio cannot be longer than 80 characters"),
});

export const addNewLinkValidation = Yup.object().shape({
  link_title: Yup.string()
    .max(60, "Title cannot be longer than 60 characters")
    .required("Title is required"),
  link_url: Yup.string()
    .trim()
    .url("Enter a valid URL (e.g., www.naptimeisnow.com/dreams)")
    .required("URL is required"),
});

export const linkLayoutValidation = Yup.object().shape({
  link_layout: Yup.string()
    .oneOf(["classic", "featured"], "Please choose a layout for your link.")
    .required("Layout is required."),
});

export const linkLockSensitiveContentValidation = Yup.object().shape({
  sensitive_content: Yup.boolean().default(false).optional(),
});
