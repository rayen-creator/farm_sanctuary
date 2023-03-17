import { rating } from './rating'
import { category } from './category'

export type Feedback = {
    'title': String
    'subject': String
    'content': String
    'rating':rating
    'category': category
}