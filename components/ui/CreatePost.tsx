"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import CreatePoll from "./CreatePoll";

import add_post_avatar from "/public/images/hell.jpg";
import emoji_laughing from "/public/images/icon/emoji-laughing.png";
import vgallery from "/public/images/icon/vgallery.png";

const CreatePost: React.FC = () => {
  const [isPollMode, setIsPollMode] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const documentInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiIconRef = useRef<HTMLSpanElement>(null);

  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedDocuments(files);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedMedia(files);
  };

  const triggerDocumentInput = (): void => {
    documentInputRef.current?.click();
  };

  const triggerMediaInput = (): void => {
    mediaInputRef.current?.click();
  };

  const removeDocument = (index: number): void => {
    setSelectedDocuments(selectedDocuments.filter((_, i) => i !== index));
  };

  const removeMedia = (index: number): void => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  const toggleEmojiPicker = (): void => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData: EmojiClickData): void => {
    setPostContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiIconRef.current &&
        !emojiIconRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="share-post d-flex gap-3 gap-sm-5 p-3 p-sm-5">
      <div className="profile-box">
        <Link href="#">
          <Image
            src={add_post_avatar}
            width={40}
            height={40}
            className="max-un"
            alt="profile avatar"
          />
        </Link>
      </div>
      <div className="w-100 position-relative">
        {!isPollMode ? (
          <form action="#" className="w-100 position-relative">
            <textarea
              cols={10}
              rows={2}
              placeholder="Write something to Lerio.."
              className="w-100"
              value={postContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostContent(e.target.value)
              }
            ></textarea>
            <div className="abs-area position-absolute d-none d-sm-block">
              <i
                className="material-symbols-outlined mat-icon xxltxt"
                onClick={toggleEmojiPicker}
                ref={emojiIconRef}
              >
                sentiment_satisfied
              </i>
              {showEmojiPicker && (
                <div className="emoji-picker" ref={emojiPickerRef}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <ul className="d-flex justify-content-between flex-wrap mt-3 gap-3">
              <li
                className="d-flex align-items-center gap-2"
                onClick={triggerMediaInput}
              >
                <Image
                  src={vgallery}
                  width={24}
                  height={24}
                  className="max-un"
                  alt="photo/video icon"
                />
                <span>Photo/Video</span>
                <input
                  type="file"
                  ref={mediaInputRef}
                  multiple
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={handleMediaChange}
                />
              </li>
              <li
                className="d-flex align-items-center gap-2"
                onClick={triggerDocumentInput}
              >
                <Image
                  src={emoji_laughing}
                  width={24}
                  height={24}
                  className="max-un"
                  alt="document icon"
                />
                <span>Choose Documents</span>
                <input
                  type="file"
                  ref={documentInputRef}
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: "none" }}
                  onChange={handleDocumentChange}
                />
              </li>
              <li
                className="d-flex align-items-center gap-2"
                onClick={() => setIsPollMode(true)}
              >
                <span className="material-symbols-outlined">poll</span>
                <span>Poll</span>
              </li>
            </ul>
            {selectedMedia.length > 0 && (
              <div className="selected-media mt-3">
                <h6>Selected Photos/Videos:</h6>
                <ul>
                  {selectedMedia.map((file, index) => (
                    <li
                      key={index}
                      className="smtxt d-flex align-items-center gap-2"
                    >
                      <span>{file.name}</span>
                      <button
                        className="cmn-btn alt smtxt"
                        onClick={() => removeMedia(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedDocuments.length > 0 && (
              <div className="selected-documents mt-3">
                <h6>Selected Documents:</h6>
                <ul>
                  {selectedDocuments.map((file, index) => (
                    <li
                      key={index}
                      className="smtxt d-flex align-items-center gap-2"
                    >
                      <span>{file.name}</span>
                      <button
                        className="cmn-btn alt smtxt"
                        onClick={() => removeDocument(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        ) : (
          <CreatePoll
            onCancel={() => setIsPollMode(false)}
            onSubmitPoll={(pollData) =>
              console.log("Submitted Poll:", pollData)
            }
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
