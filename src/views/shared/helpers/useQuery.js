import { useLocation } from 'react-router-dom';

// Usage: 
// const query = useQuery();
// const value = query.get('key');
export default () => new URLSearchParams(useLocation().search);
