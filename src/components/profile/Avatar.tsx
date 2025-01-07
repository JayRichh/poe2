"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/utils/cn";
import { Upload } from "lucide-react";
import { useAuth } from "~/contexts/auth";

interface AvatarProps {
  uid: string;
  url: string | null;
  size?: number;
  onUpload: (url: string) => void;
  className?: string;
  showUploadUI?: boolean;
}

export function Avatar({ uid, url, size = 40, onUpload, className, showUploadUI = true }: AvatarProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function initializeAvatar() {
      if (!url) {
        setAvatarUrl(null);
        setIsLoading(false);
        return;
      }

      try {
        await downloadImage(url);
      } catch (error) {
        console.error("Error initializing avatar:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    setHasError(false);
    initializeAvatar();
  }, [url]);

  async function downloadImage(path: string) {
    try {
      if (!path) {
        setAvatarUrl(null);
        return;
      }

      // If it's already a full URL, use it directly
      if (path.startsWith('http')) {
        setAvatarUrl(path);
        return;
      }

      // Otherwise treat it as a filename and get the URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);
      
      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error("Error getting avatar URL:", error);
      setAvatarUrl(null);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      if (!user?.id) {
        throw new Error("Please sign in to upload an avatar.");
      }

      // Ensure we're using the current user's ID from the auth context
      const userId = user.id;

      // List existing avatars for this user
      const { data: existingFiles } = await supabase.storage
        .from("avatars")
        .list(undefined, {
          search: userId
        });

      // Delete previous avatar if it exists
      if (existingFiles && existingFiles.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove(existingFiles.map(file => file.name));
          
        if (deleteError) {
          console.error("Error deleting previous avatar:", deleteError);
        }
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      // Use user ID as prefix for storage policy compliance
      const filePath = `${userId}_${new Date().getTime()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        if (uploadError.message.includes('security')) {
          throw new Error('Permission denied. Please ensure you are logged in.');
        }
        throw uploadError;
      }

      // Store just the filename in metadata, not the full URL
      if (typeof onUpload === 'function') {
        await onUpload(filePath);
      } else {
        console.error('onUpload is not a function');
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      const errorMessage = error?.message || "Error uploading avatar. Please try again.";
      console.error('Error uploading avatar:', errorMessage);
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="relative rounded-full overflow-hidden" style={{ width: size, height: size }}>
        {isLoading ? (
          <div className="w-full h-full bg-primary/5 animate-pulse" />
        ) : avatarUrl && !hasError ? (
          <div className="relative w-full h-full">
            <Image
              src={avatarUrl}
              alt="Avatar"
              className="object-cover"
              fill
              sizes={`${size}px`}
              onError={() => {
                setHasError(true);
                setAvatarUrl(null);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            {uploading ? (
              <div className="animate-pulse">
                <Upload className="w-1/2 h-1/2 text-primary/60" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-1/2 h-1/2 text-primary/40" />
                {uid === user?.id && !hasError && (
                  <span className="text-xs text-primary/60 mt-1">Upload Avatar</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {showUploadUI && (
        <label
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full cursor-pointer",
            "bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity",
            uploading && "pointer-events-none"
          )}
        >
          <span className="sr-only">Upload avatar</span>
          <Upload className="w-1/3 h-1/3 text-white" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
