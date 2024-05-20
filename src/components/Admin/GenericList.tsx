import React from 'react';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';
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
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md" >{title}</Heading>
        <Button variant="primary" leftIcon={<AddIcon />} onClick={onAdd}>
          Legg til Ny
        </Button>
      </HStack>
      <List spacing={3}>
        {items.map((item) => (
          <ListItem key={item.id} p={2} borderRadius="md">
            <HStack justifyContent="space-between" alignItems="center">
              <Box flex="1" cursor="pointer">
                {item.name}
              </Box>
              <HStack spacing={2}>
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  aria-label="View"
                  _focus= {{
                    boxShadow: '0 0 0 3px #FFFF10',
                  }}
                  icon={<ViewIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(item.id);
                  }}
                />
                <IconButton
                  variant="outline"
                  colorScheme="yellow"
                  aria-label="Edit"
                  _focus= {{
                    boxShadow: '0 0 0 3px #FFFF10',
                  }}
                  icon={<EditIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item.id);
                  }}
                />
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete"
                  _focus= {{
                    boxShadow: '0 0 0 3px #FFFF10',
                  }}
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                />
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenericList;
