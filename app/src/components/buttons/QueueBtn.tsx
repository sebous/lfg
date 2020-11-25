import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useReactiveVar } from "@apollo/client";
import { LeaveQueue, QueueSelf } from "../../graphqlTypes";
import { LEAVE_QUEUE, QUEUE_SELF } from "../../gql/peopleQueue.graphql";
import { AppColors } from "../../styles/colors";
import { ButtonStyles } from "../../styles/button";
import { queuingVar } from "../../lib/apolloCache";

interface QueueBtnProps {}

export const QueueBtn: React.FC<QueueBtnProps> = ({}) => {
  const queuing = useReactiveVar(queuingVar);
  const [queueSelf, { error: queueSelfError }] = useMutation<QueueSelf>(QUEUE_SELF);
  const [leaveQueue, { error: leaveQueueError }] = useMutation<LeaveQueue>(LEAVE_QUEUE);

  if (queueSelfError) console.log("queueSelfError", queueSelfError);
  if (leaveQueueError) console.log("leaveQueueError", leaveQueueError);

  const queueFn = () => {
    if (!queuing) {
      queueSelf();
      queuingVar(true);
    } else {
      leaveQueue();
      queuingVar(false);
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...ButtonStyles.queueBtn,
        backgroundColor: !queuing ? AppColors.GREEN : AppColors.RED,
      }}
      activeOpacity={0.5}
      delayPressIn={0.1}
      delayPressOut={0.1}
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
