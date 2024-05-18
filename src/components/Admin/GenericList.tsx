import React from 'react';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Entity } from '../../services/object-service';

interface GenericListProps {
  items: Entity[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  title: string;
}

const GenericList: React.FC<GenericListProps> = ({
  items,
  onAdd,
  onEdit,
  onDelete,
  onView,
  title,
}) => {
  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">{title}</Heading>
        <Button onClick={onAdd}>Legg til Ny</Button>
      </Box>
      <List spacing={3}>
        {items.map((item) => (
          <ListItem key={item.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box flex="1" onClick={() => onView(item.id)}>
              {item.name}
            </Box>
            <Box>
              <IconButton aria-label="View" icon={<ViewIcon />} onClick={(e) => {
                e.stopPropagation();
                onView(item.id);
              }} />
              <IconButton aria-label="Edit" icon={<EditIcon />} onClick={(e) => {
                e.stopPropagation();
                onEdit(item.id);
              }} />
              <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenericList;
