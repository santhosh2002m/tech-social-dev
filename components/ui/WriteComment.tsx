import { useState, FormEvent, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import add_post_avatar from "/public/images/add-post-avatar.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface WriteCommentProps {
  selectedGif?: string; // Prop for GIF selected from PostReaction
  onSubmit?: (data: {
    comment: string;
    gif?: string;
    media?: File | null;
  }) => void; // Callback to handle form submission
}

const WriteComment: React.FC<WriteCommentProps> = ({
  selectedGif,
  onSubmit,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [localGif, setLocalGif] = useState<string | null>(null); // Local GIF preview
  const [localMedia, setLocalMedia] = useState<string | null>(null); // Local media preview
  const [mediaFile, setMediaFile] = useState<File | null>(null); // Store the media file for submission

  // Ref to track the emoji picker element
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    // Add event listener to the window
    if (isEmojiPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when picker closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojiPickerOpen]);

  // Handle GIF file upload
  const handleGifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected for GIF upload.");
      alert("No file selected. Please select a GIF file.");
      return;
    }

    if (file.type !== "image/gif") {
      console.log("Invalid file type for GIF:", file.type);
      alert("Please select a valid GIF file.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      console.log("GIF file too large:", file.size);
      alert("GIF file is too large. Please select a file smaller than 5MB.");
      return;
    }

    try {
      if (localGif) {
        URL.revokeObjectURL(localGif); // Revoke previous URL to free memory
      }
      const gifUrl = URL.createObjectURL(file);
      setLocalGif(gifUrl);
      console.log("GIF uploaded successfully:", gifUrl);
    } catch (error) {
      console.error("Error creating GIF URL:", error);
      alert("An error occurred while uploading the GIF. Please try again.");
    }
  };

  // Handle media file upload (e.g., images)
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected for media upload.");
      alert("No file selected. Please select an image file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type for media:", file.type);
      alert("Please select a valid image file (e.g., PNG, JPEG).");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      console.log("Media file too large:", file.size);
      alert("Media file is too large. Please select a file smaller than 5MB.");
      return;
    }

    try {
      if (localMedia) {
        URL.revokeObjectURL(localMedia); // Revoke previous URL to free memory
      }
      const mediaUrl = URL.createObjectURL(file);
      setLocalMedia(mediaUrl);
      setMediaFile(file);
      console.log("Media uploaded successfully:", mediaUrl);
    } catch (error) {
      console.error("Error creating media URL:", error);
      alert("An error occurred while uploading the media. Please try again.");
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setCommentText((prev) => prev + emojiData.emoji);
    setIsEmojiPickerOpen(false); // Close picker after selection
  };

  // Remove uploaded GIF
  const removeLocalGif = () => {
    if (localGif) {
      URL.revokeObjectURL(localGif);
      setLocalGif(null);
      console.log("Local GIF removed.");
    }
  };

  // Remove uploaded media
  const removeLocalMedia = () => {
    if (localMedia) {
      URL.revokeObjectURL(localMedia);
      setLocalMedia(null);
      setMediaFile(null);
      console.log("Local media removed.");
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const gifToSubmit = selectedGif || localGif;

    if (onSubmit) {
      const submissionData = {
        comment: commentText,
        gif: gifToSubmit,
        media: mediaFile,
      };
      console.log("Submitting comment data:", submissionData);
      onSubmit(submissionData);
    }

    // Reset form after submission
    setCommentText("");
    if (localGif) {
      URL.revokeObjectURL(localGif);
      setLocalGif(null);
    }
    if (localMedia) {
      URL.revokeObjectURL(localMedia);
      setLocalMedia(null);
    }
    setMediaFile(null);
  };

  return (
    <div className="mt-5">
      {/* Debug logging */}
      {console.log("Selected GIF (from PostReaction):", selectedGif)}
      {console.log("Local GIF (uploaded):", localGif)}
      {console.log("Local Media (uploaded):", localMedia)}

      {/* Display Selected GIF from PostReaction */}
      {selectedGif && (
        <div className="selected-gif-preview mb-3">
          <p className="mdtxt" style={{ color: "var(--heading-1st-color)" }}>
            Attached GIF (from reaction):
          </p>
          <Image
            src={selectedGif}
            alt="Attached GIF"
            width={150}
            height={150}
            unoptimized // Required for GIF animation
          />
        </div>
      )}

      {/* Display Locally Uploaded GIF */}
      {localGif && !selectedGif && (
        <div className="selected-gif-preview mb-3">
          <p className="mdtxt" style={{ color: "var(--heading-1st-color)" }}>
            Attached GIF: (Only one GIF can be attached at a time)
          </p>
          <div className="d-flex align-items-center gap-3">
            <Image
              src={localGif}
              alt="Uploaded GIF"
              width={150}
              height={150}
              unoptimized // Required for GIF animation
            />
            <button
              className="cmn-btn btn-sm px-3"
              onClick={removeLocalGif}
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Display Locally Uploaded Media */}
      {localMedia && (
        <div className="selected-media-preview mb-3">
          <p className="mdtxt" style={{ color: "var(--heading-1st-color)" }}>
            Attached Media:
          </p>
          <div className="d-flex align-items-center gap-3">
            <Image
              src={localMedia}
              alt="Uploaded Media"
              width={150}
              height={150}
              unoptimized // Handle other image types
            />
            <button
              className="cmn-btn btn-sm px-3"
              onClick={removeLocalMedia}
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-3">
          <div className="profile-box d-none d-xxl-block">
            <Link href="#">
              <Image src={add_post_avatar} className="max-un" alt="icon" />
            </Link>
          </div>
          <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100 position-relative">
            <input
              placeholder="Write a comment.."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <div className="file-input d-flex gap-1 gap-md-2">
              {/* Media Upload */}
              <div className="file-upload">
                <label className="file">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                  />
                  <span className="file-custom border-0 d-grid text-center">
                    <span className="material-symbols-outlined mat-icon m-0 xxltxt">
                      perm_media
                    </span>
                  </span>
                </label>
              </div>

              {/* Emoji Picker */}
              <div className="mood-area position-relative">
                <span
                  className="material-symbols-outlined mat-icon m-0 xxltxt"
                  onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                  aria-label="Open emoji picker"
                >
                  mood
                </span>
                {isEmojiPickerOpen && (
                  <div
                    className="emoji-picker position-absolute"
                    style={{ zIndex: 10 }}
                    ref={emojiPickerRef}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btn-area d-flex">
            <button type="submit" className="cmn-btn px-2 px-sm-5 px-lg-6">
              <i className="material-symbols-outlined mat-icon m-0 fs-xxl">
                near_me
              </i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteComment;
