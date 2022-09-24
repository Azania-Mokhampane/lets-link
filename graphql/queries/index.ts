import { gql } from "@apollo/client";

export const MEETUP_LIST = gql`
  query MeetUpList {
    meetup_list {
      meetup_address
      meetup_description
      meetup_image
      meetup_title
      uuid
    }
  }
`;