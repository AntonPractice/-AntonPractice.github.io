// import {render, screen, waitFor} from "@testing-library/react";
// import {MemoryRouter, Route, Routes} from "react-router-dom";
// import React from "react";
// import {userEvent} from "@testing-library/user-event";
// import {SomeModal, useSomeModal} from "src/components/Modals/SomeModal";
// import '@testing-library/jest-dom';


// const TestComponent = () => {
//     return (
//         <MemoryRouter initialEntries={['/?someModalId=text data']}>
//             <SomeModal/>
//             <Routes>
//                 <Route path={'/'} element={<div>Content</div>}/>
//             </Routes>
//         </MemoryRouter>
//     )
// }

// describe('SomeModal', () => {
//     it('should be visible if has query parameter', () => {
//         render(<TestComponent/>)
//         expect(screen.getByText('text data')).toBeInTheDocument();
//     })

//     it('should be visible if has query parameter', async () => {

//         const user = userEvent.setup();
//         render(<TestComponent/>)

//         await user.click(screen.getByText('Cancel'))
//         await waitFor(() => {
//             expect(screen.queryByText('text data')).not.toBeVisible();
//         })
//     })
// })

