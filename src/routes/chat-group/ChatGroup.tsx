import React from "react";
import { Button, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import CreateChatGroupForm from "./CreateChatGroupForm";

type Props = {};

const ChatGroup = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <div >
      {/* <Button onClick={open}>Create Group</Button> */}

      {/* <>
        <Modal  opened={opened} onClose={close} title="Authentication" centered>
          <CreateChatGroupForm/>
        </Modal>
      </> */}
      <CreateChatGroupForm/>
    </div>
  );
};

export default ChatGroup;
