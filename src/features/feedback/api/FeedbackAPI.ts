import { Feedback } from '../types/Feedback';
import { Status } from '../types/Status';

const FeedbackAPI = {
  async fetchFeedbacks(): Promise<any[]> {
    return fetch(`${process.env.PUBLIC_URL}/feedbacks.json`)
      .then((res) => res.json());
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async upvote(id: number): Promise<any> {
    return Promise.resolve(true);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async downvote(id: number): Promise<any> {
    return Promise.resolve(true);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async changeStatus(id: number, status: Status): Promise<any> {
    return Promise.resolve(true);
  },

  async save(feedback: Feedback) {
    return Promise.resolve(feedback);
  },
};

export default FeedbackAPI;
