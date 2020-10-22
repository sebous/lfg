import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../providers/UserProvider";
import { useMutation } from "@apollo/client";
import { LeaveQueue, QueueSelf } from "../../graphqlTypes";
import { LEAVE_QUEUE, QUEUE_SELF } from "../../gql/peopleQueue.graphql";
import { AppColors } from "../../styles/colors";
import { ButtonStyles } from "../../styles/button";

interface QueueBtnProps {}

export const QueueBtn: React.FC<QueueBtnProps> = ({}) => {
  const { queuing, setQueuing } = useContext(UserContext);
  const [queueSelf, { error: queueSelfError }] = useMutation<QueueSelf>(QUEUE_SELF);
  const [leaveQueue, { error: leaveQueueError }] = useMutation<LeaveQueue>(LEAVE_QUEUE);

  if (queueSelfError) console.log("queueSelfError", queueSelfError);
  if (leaveQueueError) console.log("leaveQueueError", leaveQueueError);

  const queueFn = () => {
    if (!queuing) {
      queueSelf();
      setQueuing(true);
    } else {
      leaveQueue();
      setQueuing(false);
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...ButtonStyles.queueBtn,
        backgroundColor: !queuing ? AppColors.GREEN : AppColors.RED,
      }}
      activeOpacity={0.5}
      delayPressIn={0.05}
      delayPressOut={0.05}
      onPress={queueFn}
    >
      {!queuing ? (
        <AntDesign name="checkcircleo" size={32} />
      ) : (
        <AntDesign name="poweroff" size={32} />
      )}
    </TouchableOpacity>
  );
};
