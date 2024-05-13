import React from 'react';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

interface Entity {
  id: number;
  name: string;
}

interface GenericListProps {
  items: Entity[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  title: string;
}

const GenericList: React.FC<GenericListProps> = ({ items, onAdd, onEdit, onDelete, onView, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">{title}</Heading>
        <Button onClick={onAdd}>Legg til Ny</Button>
      </Box>
      <List spacing={3}>
        {items.map((item) => (
          <ListItem key={item.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box flex="1">{item.name}</Box>
            <IconButton aria-label="View" icon={<ViewIcon />} onClick={() => onView(item.id)} />
            <IconButton aria-label="Edit" icon={<EditIcon />} onClick={() => onEdit(item.id)} />
            <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={() => onDelete(item.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenericList;
