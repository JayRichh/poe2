"use client";

import { useState } from "react";

import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";

import type { Database } from "~/lib/supabase/types";

type SkillGem = Database["public"]["Tables"]["skill_gems"]["Row"];
type GemType = Database["public"]["Enums"]["gem_type"];
type SocketColor = Database["public"]["Enums"]["socket_color"];

type BaseSocket = {
  id: string;
  color: SocketColor | undefined;
  group: number;
  index: number;
};

type EmptySocket = BaseSocket & {
  gem?: undefined;
};

type FilledSocket = BaseSocket & {
  gem: SkillGem;
};

type GemSocket = EmptySocket | FilledSocket;

interface SkillGemManagerProps {
  buildId: string;
  gems?: SkillGem[];
  onUpdate?: (gems: SkillGem[]) => void;
}

const MAX_SOCKETS = 8;
const EMPTY_SOCKET: EmptySocket = {
  id: "",
  color: undefined,
  group: 0,
  index: 0,
  gem: undefined,
};

export function SkillGemManager({ buildId, gems = [], onUpdate }: SkillGemManagerProps) {
  const [sockets, setSockets] = useState<GemSocket[]>(() => {
    // Initialize sockets from existing gems
    const initialSockets: GemSocket[] = gems.map((gem, index) => ({
      id: `socket-${index}`,
      color: gem.color,
      gem,
      group: gem.socket_group || 0,
      index: gem.socket_index || index,
    }));

    // Add empty sockets up to MAX_SOCKETS
    while (initialSockets.length < MAX_SOCKETS) {
      const emptySocket: EmptySocket = {
        ...EMPTY_SOCKET,
        id: `socket-${initialSockets.length}`,
        group: Math.floor(initialSockets.length / 2),
        index: initialSockets.length,
      };
      initialSockets.push(emptySocket);
    }

    return initialSockets;
  });

  const handleUpdateSocket = (socketId: string, updates: Partial<GemSocket>) => {
    const updatedSockets = sockets.map((socket) => {
      if (socket.id === socketId) {
        return { ...socket, ...updates };
      }
      return socket;
    });

    setSockets(updatedSockets);

    // Extract and update gems
    const updatedGems = updatedSockets
      .filter((socket): socket is FilledSocket => socket.gem !== undefined)
      .map((socket) => ({
        ...socket.gem,
        socket_group: socket.group,
        socket_index: socket.index,
      }));

    onUpdate?.(updatedGems);
  };

  // Group sockets for linked display
  const socketGroups = sockets.reduce(
    (groups, socket) => {
      const group = groups[socket.group] || [];
      group[socket.index % 2] = socket;
      groups[socket.group] = group;
      return groups;
    },
    {} as Record<number, GemSocket[]>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Text className="text-xl font-semibold">Skill Gems</Text>
      </div>

      <div className="space-y-4">
        {Object.entries(socketGroups).map(([groupId, groupSockets]) => (
          <div
            key={groupId}
            className="flex items-center gap-2 p-4 rounded-lg border border-border/50 bg-background/95"
          >
            {groupSockets.map((socket) => (
              <div
                key={socket.id}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${socket.color ? `bg-${socket.color.toLowerCase()}-500/20` : "bg-foreground/10"}
                  ${socket.gem ? "border-2 border-primary/50" : "border border-border/50"}
                `}
              >
                {socket.gem ? (
                  <div className="text-center">
                    <Text className="text-xs font-medium">{socket.gem.name}</Text>
                    <Text className="text-xs text-foreground/60">
                      {socket.gem.level}/{socket.gem.quality}
                    </Text>
                  </div>
                ) : (
                  <Text className="text-xs text-foreground/40">Empty</Text>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Text className="text-sm text-foreground/60">
          Drag and drop gems to rearrange. Click a socket to add or modify gems.
        </Text>
      </div>
    </Card>
  );
}
