import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';

import { Container, Row, Stack, Col, Button } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';

function App() {

	const {
		loading,
		fromText,
		result,
		fromLanguage,
		toLanguage,
		setFromLanguage,
		setToLanguage,
		interchangeLanguages,
		setFromText,
		setResult
	} = useStore();

	useEffect(() => {
		if (fromText === '') return

		translate({ fromLanguage, toLanguage, text: fromText })
			.then(result => {
				if (result == null) return
				setResult(result)
			})
	}, [fromText])

	return (
		<Container fluid>
			<h1>Translate</h1>

			<Row>
				<Col>
					<Stack gap={2}>

						<LanguageSelector
							type={SectionType.From}
							value={fromLanguage}
							onChange={setFromLanguage}
						/>
						<TextArea
							loading={loading}
							type={SectionType.From}
							value={fromText}
							onChange={setFromText}
						/>

					</Stack>
				</Col>

				<Col xs='auto'>
					<Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
						<ArrowIcon />
					</Button>
				</Col>

				<Col>
					<Stack gap={2}>
						<LanguageSelector
							type={SectionType.To}
							value={toLanguage}
							onChange={setToLanguage}
						/>
						<TextArea
							loading={loading}
							type={SectionType.To}
							value={result}
							onChange={setResult}
						/>
					</Stack>
				</Col>
			</Row>
		</Container>
	)
}

export default App
