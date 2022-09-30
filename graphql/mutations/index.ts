import { gql } from "@apollo/client";

export const ADD_MEETUP = gql`
  mutation AddMeetup($object: meetup_list_insert_input!) {
    insert_meetup_list_one(object: $object) {
      uuid
    }
  }
`;

