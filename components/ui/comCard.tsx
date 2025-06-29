'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { User } from 'lucide-react';

interface GlassCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  profile?: string;
  createdBy?: string;
  email?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
}

export default function ComCard({
  title,
  description,
  icon,
  profile,
  createdBy,
  email,
  buttonText = "Join",
  onButtonClick,
  loading = false
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-md bg-muted/40 border border-border p-6 rounded-xl shadow-md flex flex-col items-center gap-4 text-center"
    >
      <Avatar className="w-20 h-20">
        {profile ? (
          <AvatarImage src={profile} alt="Avatar" />
        ) : (
          <AvatarFallback>
            <User size={30} />
          </AvatarFallback>
        )}
      </Avatar>

      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
        {icon} {title}
      </h3>

      <p className="text-sm text-muted-foreground">{description}</p>

      {createdBy && (
        <p className="text-xs text-muted-foreground">Created by: {createdBy}</p>
      )}
      {email && (
        <p className="text-xs text-muted-foreground">Email: {email}</p>
      )}

      {onButtonClick && (
        <Button
          onClick={onButtonClick}
          className="w-full mt-2"
          disabled={loading}
        >
          {loading ? 'Joining...' : buttonText}
        </Button>
      )}
    </motion.div>
  );
}