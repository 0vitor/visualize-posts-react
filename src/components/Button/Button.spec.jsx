import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './index'

describe('<Button />', () => {
    it('should render the button with the text', () => {
        render(<Button text="Load more"/>)
        expect.assertions(1)

        const button = screen.getByRole('button', { name: /load more/i })
        expect(button).toBeInTheDocument()
    })

    it('should call function on button click', () => {
        const fn = jest.fn()
        render(<Button text="Load more" onClick={fn}/>)

        const button = screen.getByRole('button', { name: /load more/i })
        userEvent.click(button)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should disable the button when disabled is true', () => {
        const fn = jest.fn()
        render(<Button text="Load more" onClick={fn} disabled={true}/>)

        const button = screen.getByRole('button', { name: /load more/i })
        expect(button).toBeDisabled()
    })

    it("should match snapshot", () => {
        const fn = jest.fn()
        const { container } = render(<Button text="Load more" onClick={fn} disabled={true}/>)
        expect(container.firstChild).toMatchSnapshot();
      });
})

//query não levanta erro se eu não achar o que eu quero
//quando sabemos de certeza que o elemento esta na tela usameos o get