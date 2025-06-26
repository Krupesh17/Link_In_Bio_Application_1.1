import {
  amazonShopURLValidation,
  appleMusicURLValidation,
  emailAddressValidation,
  facebookURLValidation,
  gitHubURLValidation,
  instagramThreadsUsernameValidation,
  linkedInURLValidation,
  personalWebsiteURLValidation,
  phoneNumberValidation,
  snapchatURLValidation,
  soundCloudURLValidation,
  spotifyURLValidation,
  telegramURLValidation,
  twitterXUsernameValidation,
  whatsappChannelURLValidation,
  youtubeURLValidation,
} from "@/validations";
import {
  InstagramLogo,
  AmazonLogo,
  ChatCircle,
  Envelope,
  FacebookLogo,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MusicNotes,
  Phone,
  SnapchatLogo,
  SoundcloudLogo,
  SpotifyLogo,
  TelegramLogo,
  ThreadsLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

export const socialChannelList = [
  {
    name: "Instagram",
    slug: "instagram",
    icon: <InstagramLogo size={24} />,
    placeholder: "Enter Instagram Username*",
    example: "@instagramusername",
    onClick: (username) => {
      const cleanUsername = username?.replace(/^@/, "");
      window.open(
        `https://www.instagram.com/${cleanUsername}`,
        "_blank",
        "noopener noreferrer"
      );
    },
    validation: instagramThreadsUsernameValidation,
  },
  {
    name: "Threads",
    slug: "threads",
    icon: <ThreadsLogo size={24} />,
    placeholder: "Enter Threads Username*",
    example: "@threadsusername",
    onClick: (username) => {
      window.open(
        `https://www.threads.com/${username}`,
        "_blank",
        "noopener noreferrer"
      );
    },
    validation: instagramThreadsUsernameValidation,
  },
  {
    name: "Email",
    slug: "email",
    icon: <Envelope size={24} />,
    placeholder: "Enter Email Address*",
    example: "your@emailaddress.com",
    onClick: (email) => {
      window.location.href = `mailto:${email}`;
    },
    validation: emailAddressValidation,
  },
  {
    name: "Facebook",
    slug: "facebook",
    icon: <FacebookLogo size={24} />,
    placeholder: "Enter Facebook URL*",
    example: "https://facebook.com/facebookpageurl",
    onClick: (facebookPageURL) => {
      window.open(facebookPageURL, "_blank", "noopener noreferrer");
    },
    validation: facebookURLValidation,
  },
  {
    name: "YouTube",
    slug: "youtube",
    icon: <YoutubeLogo size={24} />,
    placeholder: "Enter YouTube URL*",
    example: "https://youtube.com/channel/youtubechannelurl",
    onClick: (youtubeURL) => {
      window.open(youtubeURL, "_blank", "noopener noreferrer");
    },
    validation: youtubeURLValidation,
  },
  {
    name: "X (Formerly Twitter)",
    slug: "x-twitter",
    icon: <XLogo size={24} />,
    placeholder: "Enter X (formerly Twitter) Handle*",
    example: "@yourxhandle",
    onClick: (username) => {
      const cleanUsername = username?.replace(/^@/, "");
      window.open(
        `https://x.com/${cleanUsername}`,
        "_blank",
        "noopener noreferrer"
      );
    },
    validation: twitterXUsernameValidation,
  },
  {
    name: "WhatsApp",
    slug: "whatsapp",
    icon: <WhatsappLogo size={24} />,
    placeholder: "Enter WhatsApp Number*",
    example: "+919876543210",
    onClick: (phoneNumber) => {
      window.open(
        `https://wa.me/${phoneNumber}`,
        "_blank",
        "noopener noreferrer"
      );
    },
    validation: phoneNumberValidation,
  },
  {
    name: "WhatsApp Channel",
    slug: "whatsapp-channel",
    icon: <ChatCircle size={24} />,
    placeholder: "Enter WhatsApp Channel URL*",
    example: "https://www.whatsapp.com/channel/yourchannel",
    onClick: (whatsappChannelURL) => {
      window.open(whatsappChannelURL, "_blank", "noopener noreferrer");
    },
    validation: whatsappChannelURLValidation,
  },
  {
    name: "Snapchat",
    slug: "snapchat",
    icon: <SnapchatLogo size={24} />,
    placeholder: "Enter Snapchat URL*",
    example: "https://www.snapchat.com/add/yourusername",
    onClick: (snapchatProfileURL) => {
      window.open(snapchatProfileURL, "_blank", "noopener noreferrer");
    },
    validation: snapchatURLValidation,
  },
  {
    name: "Amazon",
    slug: "amazon",
    icon: <AmazonLogo size={24} />,
    placeholder: "Enter Amazon URL*",
    example: "https://amazon.com/shop/yourshopname",
    onClick: (amazonShopURL) => {
      window.open(amazonShopURL, "_blank", "noopener noreferrer");
    },
    validation: amazonShopURLValidation,
  },
  {
    name: "Linkedin",
    slug: "linkedin",
    icon: <LinkedinLogo size={24} />,
    placeholder: "Enter Linkedin URL*",
    example: "https://linkedin.com/in/username",
    onClick: (linkedinProfileURL) => {
      window.open(linkedinProfileURL, "_blank", "noopener noreferrer");
    },
    validation: linkedInURLValidation,
  },
  {
    name: "Github",
    slug: "github",
    icon: <GithubLogo size={24} />,
    placeholder: "Enter Github URL*",
    example: "https://www.github.com/username",
    onClick: (githubURL) => {
      window.open(githubURL, "_blank", "noopener noreferrer");
    },
    validation: gitHubURLValidation,
  },
  {
    name: "Phone",
    slug: "phone",
    icon: <Phone size={24} />,
    placeholder: "Enter Phone Number*",
    example: "+919876543210",
    onClick: (phoneNumber) => {
      const cleanPhoneNumber = phoneNumber?.replace(/^\+/, "");
      window.location.href = `tel:+${cleanPhoneNumber}`;
    },
    validation: phoneNumberValidation,
  },
  {
    name: "Telegram",
    slug: "telegram",
    icon: <TelegramLogo size={24} />,
    placeholder: "Enter Telegram URL*",
    example: "https://t.me/",
    onClick: (telegramURL) => {
      window.open(telegramURL, "_blank", "noopener noreferrer");
    },
    validation: telegramURLValidation,
  },
  {
    name: "Soundcloud",
    slug: "soundcloud",
    icon: <SoundcloudLogo size={24} />,
    placeholder: "Enter Soundcloud URL*",
    example: "https://soundcloud.com/username",
    onClick: (soundcloudProfileURL) => {
      window.open(soundcloudProfileURL, "_blank", "noopener noreferrer");
    },
    validation: soundCloudURLValidation,
  },
  {
    name: "Spotify",
    slug: "spotify",
    icon: <SpotifyLogo size={24} />,
    placeholder: "Enter Spotify URL*",
    example: "https://open.spotify.com/artist/artistname",
    onClick: (spotifyProfileURL) => {
      window.open(spotifyProfileURL, "_blank", "noopener noreferrer");
    },
    validation: spotifyURLValidation,
  },
  {
    name: "Apple Music",
    slug: "apple-music",
    icon: <MusicNotes size={24} />,
    placeholder: "Enter Apple Music URL*",
    example: "https://music.apple.com/us/album/youralbum",
    onClick: (appleMusicAlbumURL) => {
      window.open(appleMusicAlbumURL, "_blank", "noopener noreferrer");
    },
    validation: appleMusicURLValidation,
  },
  {
    name: "Personal Website",
    slug: "personal-website",
    icon: <Globe size={24} />,
    placeholder: "Enter Personal Website URL*",
    example: "https://www.yourwebsite.com",
    onClick: (personalWebsiteURL) => {
      window.open(personalWebsiteURL, "_blank", "noopener noreferrer");
    },
    validation: personalWebsiteURLValidation,
  },
];
