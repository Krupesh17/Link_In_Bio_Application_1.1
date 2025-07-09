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

export const profileImageLayoutValidation = Yup.object().shape({
  profileImageLayout: Yup.string()
    .oneOf(["classic", "hero"], "Please choose profile image layout.")
    .required("Profile image layout is required."),
});

export const appearanceWallpaperColorValidation = Yup.object().shape({
  color: Yup.string()
    .required("Favorite color is required")
    .matches(
      /^#([0-9a-fA-F]{3}){1,2}$/,
      "Must be a valid hex color (e.g., #RRGGBB)"
    )
    .test(
      "is-hex-length",
      "Hex color must be 4 or 7 characters long (including #)",
      (value) => {
        return !value || value.length === 4 || value.length === 7;
      }
    ),
});

export const appearanceButtonsValidation = Yup.object({
  buttonType: Yup.string()
    .oneOf(
      [
        "fill_flat",
        "fill_rounded_md",
        "fill_rounded_full",
        "outline_flat",
        "outline_rounded_md",
        "outline_rounded_full",
        "soft_shadow_flat",
        "soft_shadow_rounded_md",
        "soft_shadow_rounded_full",
        "hard_shadow_flat",
        "hard_shadow_rounded_md",
        "hard_shadow_rounded_full",
      ],
      "Please select a valid button type"
    )
    .required("Button type is required"),

  buttonColor: Yup.string()
    .matches(/^#([0-9A-F]{6})$/i, "Enter a valid hex color like #FF0000")
    .required("Button color is required"),

  buttonFontColor: Yup.string()
    .matches(/^#([0-9A-F]{6})$/i, "Enter a valid hex color like #FFFFFF")
    .required("Font color is required"),

  buttonShadow: Yup.string()
    .nullable()
    .when("buttonType", {
      is: (val) => val.includes("shadow"),
      then: (schema) =>
        schema
          .matches(/^#([0-9A-F]{6})$/i, "Enter a valid hex color like #000000")
          .required("Shadow color is required for shadow button types"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const appearanceWallpaperConfigValidation = Yup.object().shape({
  wallpaperType: Yup.string()
    .oneOf(
      ["flat-color", "gradient", "image", "polka", "strips", "zig-zag"],
      "Please select a wallpaper type"
    )
    .required("Wallpaper type is required"),

  wallpaperColor: Yup.string()
    .matches(/^#([0-9A-F]{6})$/i, "Enter a valid hex color like #FF0000")
    .required("Wallpaper color is required"),
});

export const appearanceFontConfigValidation = Yup.object().shape({
  fontColor: Yup.string()
    .matches(/^#([0-9A-F]{6})$/i, "Enter a valid hex color like #FFFFFF")
    .required("Font color is required"),
});

export const userLandingLinkLockDateOfBirthValidation = Yup.object().shape({
  day: Yup.number()
    .typeError("Day must be a number")
    .integer("Day must be an integer")
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31")
    .required("Day is required")
    .transform((value, originalValue) => {
      if (originalValue && originalValue.length > 2) {
        return parseInt(originalValue.substring(0, 2), 10);
      }
      return value;
    })
    .test(
      "len",
      "Day must be 2 digits",
      (val) => val === null || val === undefined || String(val).length <= 2
    ),
  month: Yup.number()
    .typeError("Month must be a number")
    .integer("Month must be an integer")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12")
    .required("Month is required")
    .transform((value, originalValue) => {
      if (originalValue && originalValue.length > 2) {
        return parseInt(originalValue.substring(0, 2), 10);
      }
      return value;
    })
    .test(
      "len",
      "Month must be 2 digits",
      (val) => val === null || val === undefined || String(val).length <= 2
    ),
  year: Yup.number()
    .typeError("Year must be a number")
    .integer("Year must be an integer")
    .min(1900, "Year seems too early")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Year is required")
    .test(
      "len",
      "Year must be 4 digits",
      (val) => val === null || val === undefined || String(val).length === 4
    ),
});

export const userLandingPageVisibilityValidation = Yup.object().shape({
  pageVisibilityStatus: Yup.string()
    .oneOf(["public", "private"], "Please choose page visibility status.")
    .required("Page visibility status is required."),
});

export const userLandingPageElementsVisibilityValidation = Yup.object().shape({
  profileImageVisible: Yup.boolean()
    .required("Profile image visibility is required.")
    .typeError("Profile image visibility must be a boolean."),
  profileBioVisible: Yup.boolean()
    .required("Profile bio visibility is required.")
    .typeError("Profile bio visibility must be a boolean."),
  profileSocialIconsVisible: Yup.boolean()
    .required("Profile social icons visibility is required.")
    .typeError("Profile social icons visibility must be a boolean."),
});
