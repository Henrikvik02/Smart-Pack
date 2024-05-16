import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Entity } from '../../services/object-service';

interface GenericListProps {
  items: Entity[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  title: string;
  renderSubList?: (subItems: Entity[]) => JSX.Element; // Function to render sublist
}

const GenericList: React.FC<GenericListProps> = ({
  items,
  onAdd,
  onEdit,
  onDelete,
  onView,
  title,
  renderSubList,
}) => {
  const [openSubLists, setOpenSubLists] = useState<Set<number>>(new Set()); // Tracks open sublists

  const toggleSubList = (id: number) => {
    const newOpenSubLists = new Set(openSubLists);
    if (newOpenSubLists.has(id)) {
      newOpenSubLists.delete(id);
    } else {
      newOpenSubLists.add(id);
    }
    setOpenSubLists(newOpenSubLists);
  };

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">{title}</Heading>
        <Button onClick={onAdd}>Legg til Ny</Button>
      </Box>
      <List spacing={3}>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem display="flex" justifyContent="space-between" alignItems="center">
              <Box flex="1" onClick={() => item.subItems && item.subItems.length ? toggleSubList(item.id) : onView(item.id)}>
                {item.name}
              </Box>
              <Box>
                {item.subItems && item.subItems.length > 0 && (
                  <IconButton
                    aria-label="Expand"
                    icon={openSubLists.has(item.id) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubList(item.id);
                    }}
                  />
                )}
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
            {item.subItems && openSubLists.has(item.id) && (
              <Collapse in={openSubLists.has(item.id)} animateOpacity>
                {renderSubList && renderSubList(item.subItems)}
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default GenericList;
