import { AiOutlineNotification } from "react-icons/all";

export default {
  name: "generalNotifications",
  type: "document",
  title: "Notifications",
  icon: AiOutlineNotification,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Info",
      initialValue: "Global notifications for all users",
      readOnly: true,
    },
    {
      name: "updates",
      type: "array",
      title: "Updates",
      initialValue: [],
      of: [
        {
          type: "projectUpdateText",
        },
        {
          type: "projectUpdateMedia",
        },
        {
          type: "projectUpdateShort",
        },
        {
          type: "globalNotificationNewProject",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "No title" }) {
      return {
        title,
      }
    },
  },
}
