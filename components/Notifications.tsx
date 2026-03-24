"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUiConfig,
} from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import type { ReactNode } from "react";

export default function Notifications() {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-lg outline-none"
        >
          <Image
            src="/assets/icons/bell.svg"
            alt="inbox"
            width={24}
            height={24}
          />
          {count > 0 && (
            <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUiConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you</>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">
                No notifications yet
              </p>
            )}

            {unreadNotifications.length > 0 &&
              unreadNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                  className="bg-dark-200 text-white"
                  href={`/documents/${inboxNotification.roomId}`}
                  showActions={false}
                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showRoomName={false}
                        showActions={false}
                      />
                    ),
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    $documentAccess: (props) => {
                      const activity = props.inboxNotification.activities[0];
                      const data = activity?.data as {
                        title?: string;
                        avatar?: string;
                      };
                      return (
                        <InboxNotification.Custom
                          {...props}
                          title={data?.title}
                          aside={
                            <InboxNotification.Icon className="bg-transparent">
                              <Image
                                src={data?.avatar ?? ""}
                                width={36}
                                height={36}
                                alt="avatar"
                                className="rounded-full"
                              />
                            </InboxNotification.Icon>
                          }
                        >
                          {props.children}
                        </InboxNotification.Custom>
                      );
                    },
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUiConfig>
      </PopoverContent>
    </Popover>
  );
}
